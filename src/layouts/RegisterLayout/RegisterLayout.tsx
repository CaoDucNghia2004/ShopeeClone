import Footer from 'src/components/Footer'
import RegisterHeader from 'src/components/RegisterHeader'

interface Props {
  children?: React.ReactNode //là kiểu dữ liệu đại diện cho bất kỳ phần tử React hợp lệ nào, bao gồm: chuỗi, số, JSX, fragment (<>...</>), hoặc thậm chí là null, undefined.
}

export default function RegisterLayout({ children }: Props) {
  return (
    <div>
      <RegisterHeader />
      {children}
      <Footer />
    </div>
  )
}
