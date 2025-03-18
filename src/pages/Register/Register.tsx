import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { schema, Schema } from 'src/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import Input from 'src/components/Input'
import { useMutation } from '@tanstack/react-query'
import authApi from 'src/apis/auth.api'
//Không có tính năng tree-shaking
// import { omit } from 'lodash'

import omit from 'lodash/omit'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'
import { ErrorResponse } from 'src/types/utils.type'
import { useContext } from 'react'
import { AppContext } from 'src/contexts/app.context'
import Button from 'src/components/Button'
import { Helmet } from 'react-helmet-async'

// interface FormData {
//   email: string
//   password: string
//   confirm_password: string
// }

type FormData = Pick<Schema, 'email' | 'password' | 'confirm_password'>
const registerSchema = schema.pick(['email', 'password', 'confirm_password'])

export default function Register() {
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const navigate = useNavigate()
  // register sẽ cung cấp thông tin cho react-hook-form
  const {
    register,
    handleSubmit,
    setError,
    // getValues,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(registerSchema)
  })

  // const rules = getRules(getValues)

  //Bình thường khi submit form thì ta làm kiểu như vậy, nhưng khi dùng ReactHookForm thì
  // const onSubmit = (event: kiểu) =>{
  //   event.preventDefault()
  // }

  const registerAccountMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'confirm_password'>) => authApi.registerAccount(body)
  })

  const onSubmit = handleSubmit((data) => {
    const body = omit(data, ['confirm_password'])
    registerAccountMutation.mutate(body, {
      onSuccess: (data) => {
        setIsAuthenticated(true)
        setProfile(data.data.data.user)
        navigate('/')
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ErrorResponse<Omit<FormData, 'confirm_password'>>>(error)) {
          const formError = error.response?.data.data
          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof Omit<FormData, 'confirm_password'>, {
                message: formError[key as keyof Omit<FormData, 'confirm_password'>],
                type: 'Server'
              })
            })
          }
          // if (formError?.email) {
          //   setError('email', {
          //     message: formError.email,
          //     type: 'Server'
          //   })
          // }
          // if (formError?.password) {
          //   setError('password', {
          //     message: formError.password,
          //     type: 'Server'
          //   })
          // }
        }
      }
    })
  })

  // const formValues = watch()
  // console.log(formValues)

  return (
    <div className='bg-orange-500'>
      <Helmet>
        <title>Đăng ký | Shopee Clone</title>
        <meta name='description' content='Đăng ký tài khoản dự án Shopee Clone' />
      </Helmet>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='grid grid-cols-1 lg:grid-cols-5 py-12 lg:py-32 lg:pr-10 text-start'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='p-10 rounded bg-white shadow-sm' onSubmit={onSubmit} noValidate>
              <div className='text-2xl'>Đăng ký</div>
              <Input
                name='email'
                register={register}
                type='email'
                className='mt-8'
                errorMessage={errors.email?.message}
                placeholder='Email'
                // rules={rules.email}
              />
              <Input
                name='password'
                register={register}
                type='password'
                className='mt-2'
                classNameEye='absolute right-[5px] h-5 w-5 cursor-pointer top-[12px]'
                errorMessage={errors.password?.message}
                placeholder='Password'
                // rules={rules.password}
                autoComplete='on'
              />
              {/* <div className='mt-2'>
                <input
                  type='password'
                  placeholder='Password'
                  autoComplete='on'
                  className='p-3 w-full outline-none border border-gray-300 focus:border-gray-500 focus:shadow-sm'
                  {...register('password', rules.password)}
                />
                <div className='mt-1 text-red-600 min-h-[1.25rem] text-sm'>{errors.password?.message}</div>
              </div> */}

              <Input
                name='confirm_password'
                register={register}
                type='password'
                className='mt-2'
                classNameEye='absolute right-[5px] h-5 w-5 cursor-pointer top-[12px]'
                errorMessage={errors.confirm_password?.message}
                placeholder='Confirm Password'
                // rules={rules.confirm_password}
                autoComplete='on'
              />
              {/* <div className='mt-2'>
                <input
                  type='password'
                  placeholder='Confirm Password'
                  autoComplete='on'
                  className='p-3 w-full outline-none border border-gray-300 focus:border-gray-500 focus:shadow-sm'
                  {...register('confirm_password', {
                    ...rules.confirm_password
                  })}
                />
                <div className='mt-1 text-red-600 min-h-[1.25rem] text-sm'>{errors.confirm_password?.message}</div>
              </div> */}
              <div className='mt-2'>
                <Button
                  type='submit'
                  className='w-full t py-4 px-2 uppercase bg-red-500 text-white text-sm hover:bg-red-600 flex justify-center items-center'
                  isLoading={registerAccountMutation.isPending}
                  disabled={registerAccountMutation.isPending}
                >
                  Đăng ký
                </Button>
              </div>
              <div className='flex items-center justify-center mt-8'>
                <span className='text-gray-400'>Bạn đã có tài khoản?</span>
                <Link to='/login' className='text-red-500 ml-2'>
                  Đăng nhập
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
