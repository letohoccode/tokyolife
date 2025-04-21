import { useForm } from "@tanstack/react-form"
import { useMutation } from "@tanstack/react-query"
import { SearchOrderApi } from "../../authentication/OrderApi"
import Input from "../../component/input"
import Button from "../../component/button"
import { useState } from "react"
import { OrderDetail } from "../../utils/Form"

const SearchOrder = () => {
    const isSearchOrderApi = useMutation({
        mutationFn: (data: string) => SearchOrderApi(data)
    })
    const [orderDetail,SetOrderDetail] = useState<OrderDetail>();
    const form =useForm({
        defaultValues: {
            orderId : ''
        },
        onSubmit : async ({value}) => {
            console.log(value);
            const data = value.orderId
            await isSearchOrderApi.mutateAsync(data,{
                onSuccess : (data) => {
                    console.log(data)
                    SetOrderDetail(data.data.data)
                }
            }
            )
        }
    })
  return (
    <div className="w-[500px]  h-[500px] mx-auto">
        <form onSubmit={(e) => {
            e.preventDefault(),
            e.stopPropagation(),
            form.handleSubmit()
        }} className="mb-20">
            <div className="w-[100%] text-center mt-10">
                <h1 className="text-3xl font-semibold capitalize">Tra Cứu  thông tin đơn hàng</h1>
            </div>
            <Input Filed={form.Field} type="text" name="orderId" className="w-[100%] py-3 px-2 outline-none border-none mt-10 rounded-sm shadow-lg" placeholder="Mã Tra Đơn Hàng" />
            <Button Subscribe={form.Subscribe} className="py-2 px-4 rounded-lg bg-[#c92127] mt-2" name="Tra Cứu" />
        </form>
        {orderDetail && 
         <div className="w-[550px] mx-auto flex justify-between">
            <div className="w-[100%] text-center my-10 ">
                <h1 className="text-2xl font-semibold capitalize">Thông tin đơn hàng</h1>
            </div>
            <ul className="space-y-2 capitalize">
                <li>mã đơn hàng</li>
                <li>khách hàng</li>
                <li>ngày đặt hàng</li>
                <li>trạng thái</li>
            </ul>
            <ul className="space-y-2 capitalize text-right">
                <li>{orderDetail.id}</li>
                <li>{orderDetail.userName}</li>
                <li>{orderDetail.date}</li>
                <li>{orderDetail.orderStatus}</li>
            </ul>
        </div>
        }
        <div className="w-[600px] mx-auto  rounded-sm ">
            <div className="w-[100%] text-center my-10 ">
                <h1 className="text-2xl font-semibold capitalize">Thông tin đơn hàng</h1>
            </div>
            <div className="flex justify-between  border-x-[1px] border-b-[1px] rounded-sm border-[#cfcece] px-5 pb-7">

                <ul className="space-y-2 capitalize">
                    <li>mã đơn hàng</li>
                    <li>khách hàng</li>
                    <li>ngày đặt hàng</li>
                    <li>trạng thái</li>
                </ul>
                <ul className="space-y-2 capitalize text-right">
                    <li>ádsada</li>
                    <li>sdasdsa</li>
                    <li>345345</li>
                    <li>54fgdf</li>
                </ul>
            </div>
        </div>
    </div>

  )
}

export default SearchOrder