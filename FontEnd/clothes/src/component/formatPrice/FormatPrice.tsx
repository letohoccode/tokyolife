
const FormatPrice = ({ value }: { value: number }) => {
  const roundedValue = Math.round(value); 
  return <>{roundedValue.toLocaleString('vi-VN')} đ</>;
}

export default FormatPrice