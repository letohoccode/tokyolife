import { useContext, useMemo, useRef, useState } from 'react'
import Button from '../../component/button'
import Input from '../../component/input'
import { useForm } from '@tanstack/react-form'
import { ProductFormAdd, ProductSize } from '../../utils/Form'
import { useMutation, useQuery } from '@tanstack/react-query'
import { ProductApi } from '../../authentication/productApi'
import { AppContextData } from '../../context/AppContext'
import { CategoryApi } from '../../authentication/Category'
import { ImageApi } from '../../authentication/imageApi'
type FormData = {
  productName: string
  title: string
  described: string
  price: string
  sale: string
  productSizeRequests: ProductSize[]
  category: string
}
const AdminAddProduct = () => {
  const { profile } = useContext(AppContextData)
  const [fileList, setFileList] = useState<FileList>()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const formList = new FormData()
  const inputListRef = useRef<HTMLInputElement>(null)
  const { data } = useQuery({
    queryKey: ['categoryProduct'],
    queryFn: CategoryApi.GetAllCategory
  })
  const urlListFile = useMemo(() => {
    const listFile = []
    if (fileList) {
      for (let i = 0; i < fileList.length; i++) {
        const url = URL.createObjectURL(fileList[i])
        listFile.push(url)
        formList.append('files', fileList[i] as Blob)
      }
    }
    return listFile
  }, [fileList, formList])
  const isProductApi = useMutation({
    mutationFn: (data: ProductFormAdd) => ProductApi.AddProduct(data)
  })
  const form = useForm<FormData>({
    defaultValues: {
      productName: '',
      title: '',
      described: '',
      category: '',
      price: '',
      sale: '',
      productSizeRequests: [] as ProductSize[]
    },
    onSubmit: async ({ value }) => {
      const data: ProductFormAdd = {
        category: value.category,
        described: value.described,
        title: value.title,
        price: Number(value.price),
        productName: value.productName,
        sale: Number(value.sale),
        productSizeRequests: value.productSizeRequests,
        userId: profile?.id,
        files: []
      }
      try {
        const result = await ImageApi.upLoadListImages(formList)
        data.files = result.data.data
      } catch (error) {
        console.log(error)
      }
      console.log('data', data)
      await isProductApi.mutate(data, {
        onSuccess: (data) => {
          console.log(data)
          swal({
            icon: 'success',
            title: 'Thêm Sản Phẩm Thành Công',
            text: 'Một Sản Phẩm Đã Được Thêm'
          })
          setFileList(undefined)
          form.reset()
        },
        onError: (error) => {
          console.log(error)
          swal({
            icon: 'error',
            title: 'Bạn Đang Gặp Một Lỗi Nào Đó'
          })
        }
      })
    }
  })
  const HandleChangeList = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files
    if (file) {
      setFileList(file)
    }
  }
  return (
    <div>
      <div className='w-[100%] py-4 px-10 text-xl font-semibold capitalize shadow-lg'>quản lý người dùng</div>
      <form
        onSubmit={(e) => {
          e.preventDefault(), e.stopPropagation(), form.handleSubmit()
        }}
        className='p-10 capitalize space-y-2'
      >
        <div className='flex w-[100%] space-x-5'>
          <div className='w-[50%] '>
            <div>tên sản phẩm</div>
            <Input
              className='capitalize outline-1 outline-red-200 border-none py-2 w-[100%]'
              type='text'
              error=''
              Filed={form.Field}
              name='productName'
              placeholder='nhập tên sản phẩm'
            />
          </div>
          <div className='w-[50%]'>
            <div>loại sản phẩm</div>
            <form.Field
              validators={{
                onChange: ({ value }) => (!value ? 'error' : undefined)
              }}
              name='category'
              children={(filed) => (
                <select
                  className='w-[200px] capitalize outline-none border-[1px] border-slate-300'
                  name='category'
                  value={filed.state.value}
                  onChange={(e) => filed.handleChange(e.target.value)}
                >
                  <option value=''>chon danh muc</option>
                  {data && data.data.data?.map((value) => <option value={value.id}>{value.category}</option>)}
                </select>
              )}
            />
          </div>
        </div>
        <div className='flex w-[100%] space-x-5'>
          <div className='w-[50%]'>
            <div>giá gốc</div>
            <Input
              className='capitalize outline-1 outline-red-200 border-none  py-2 w-[100%]'
              type='number'
              Filed={form.Field}
              name='price'
              placeholder='gia sản phẩm'
            />
          </div>
          <div className='w-[50%]'>
            <div>giảm giá</div>
            <Input
              type='number'
              className='capitalize outline-1 outline-red-200 border-none  py-2 w-[100%]'
              Filed={form.Field}
              name='sale'
              placeholder='giảm giá'
            />
          </div>
        </div>
        <div className='w-[100%]'>
          <div>Tiêu Đề Sản Phẩm</div>
          <Input
            type='text'
            className='capitalize outline-1 outline-red-200 border-none  py-2 w-[100%]'
            Filed={form.Field}
            name='title'
            placeholder='Tiêu đề'
          />
        </div>
        <form.Field
          name='productSizeRequests'
          mode='array'
          validators={{
            onChange: ({ value }) => (!value ? 'loi' : undefined)
          }}
          children={(filed) => (
            <div className='mt-5'>
              <div className='mb-3'>thêm chi tiết sản phẩm</div>
              {filed.state.value.map((_, index) => (
                <div key={index} className='flex w-[100%] mt-4 space-x-3'>
                  <form.Field
                    validators={{
                      onChange: ({ value }) => (!value ? '' : undefined)
                    }}
                    name={`productSizeRequests[${index}].size`}
                    children={(subFiled) => (
                      <div className='flex-1'>
                        <input
                          placeholder='kích cỡ'
                          className='outline-1 outline-red-200 border-none capitalize px-2 py-2 w-[100%]'
                          type='text'
                          autoFocus
                          value={subFiled.state.value}
                          onChange={(e) => subFiled.handleChange(e.target.value)}
                        />
                      </div>
                    )}
                  />
                  <form.Field
                    name={`productSizeRequests[${index}].quantity`}
                    validators={{
                      onChange: ({ value }) => (!value ? 'loi' : undefined)
                    }}
                    children={(subFiled) => (
                      <div className='flex-1'>
                        <input
                          type='number'
                          placeholder='số lượng'
                          className='outline-1 outline-red-200 border-none capitalize px-2 py-2 w-[100%]'
                          value={subFiled.state.value}
                          onChange={(e) => subFiled.handleChange(e.target.valueAsNumber)}
                        />
                      </div>
                    )}
                  />
                  <form.Field
                    name={`productSizeRequests[${index}].color`}
                    validators={{
                      onChange: ({ value }) => (!value ? 'loi' : undefined)
                    }}
                    children={(subFiled) => (
                      <div className='flex-1'>
                        <input
                          type='text'
                          placeholder='màu sắc'
                          className='outline-1 outline-red-200 border-none capitalize px-2 py-2 w-[100%]'
                          value={subFiled.state.value}
                          onChange={(e) => subFiled.handleChange(e.target.value)}
                        />
                      </div>
                    )}
                  />
                  <button className='text-[#c92127] rounded-lg' onClick={() => filed.removeValue(index)}>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='size-4'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0'
                      />
                    </svg>
                  </button>
                </div>
              ))}
              <button
                type='button'
                className='px-2 py-1 text-sm bg-[#c92127] rounded-md'
                onClick={() => filed.pushValue({ size: '', quantity: 0, color: '' })}
              >
                Them +
              </button>
            </div>
          )}
        />
        <div>
          <button
            onClick={() => inputListRef.current?.click()}
            type='button'
            className='text-[#c92127] px-2 py-3 rounded-md capitalize text-xs'
          >
            ảnh chi tiết
          </button>
          <input
            ref={inputListRef}
            className='hidden'
            type='file'
            onChange={HandleChangeList}
            multiple
            autoComplete='on'
          />
          <div className='flex space-x-2'>
            {urlListFile &&
              urlListFile.map((e, index) => (
                <div key={index} className='w-[150px] h-[200px]'>
                  <img className='w-[100%] h-[100%]' src={e} alt='' />
                </div>
              ))}
          </div>
        </div>

        <form.Field
          name='described'
          asyncDebounceMs={2000}
          children={(filed) => (
            <div className='mt-5'>
              <div>mô tả</div>
              <textarea
                className='w-[100%] h-[100px] border-[1px] border-slate-300 outline-none'
                value={filed.state.value}
                onChange={(e) => filed.handleChange(e.target.value)}
              ></textarea>
            </div>
          )}
        />
        <Button
          Subscribe={form.Subscribe}
          className='capitalize bg-[#c92127] px-2 py-3 rounded-md mt-5'
          name='thêm sản phẩm'
        />
      </form>
    </div>
  )
}

export default AdminAddProduct
