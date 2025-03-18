import Footer from 'src/components/Footer'
import Header from 'src/components/Header'

interface Props {
  children?: React.ReactNode //là kiểu dữ liệu đại diện cho bất kỳ phần tử React hợp lệ nào, bao gồm: chuỗi, số, JSX, fragment (<>...</>), hoặc thậm chí là null, undefined.
}

export default function MainLayout({ children }: Props) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  )
}
