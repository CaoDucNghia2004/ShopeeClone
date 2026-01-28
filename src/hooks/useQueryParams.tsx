import { useSearchParams } from 'react-router-dom'

export default function useQueryParams() {
  const [searchParams] = useSearchParams()
  return Object.fromEntries([...searchParams])
}

//Hook này giúp bạn lấy query params dưới dạng object.
//Ví dụ: nếu URL là /products?page=1&sort_by=price thì hook này sẽ trả về { page: '1', sort_by: 'price' }.
