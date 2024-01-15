import { Inter } from 'next/font/google'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'App',
  description: '',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
      <ToastContainer/>
    </html>
  )
}
