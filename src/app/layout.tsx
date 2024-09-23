import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';
import type { Metadata } from 'next';
// import localFont from 'next/font/local';
import '@/styles/globals.css';
import ReactQueryProviders from '@/lib/provider/ReactQueryProviders';
import { ToastContainer } from 'react-toastify';
import Gradient from './_components/Gradient';
import 'react-toastify/dist/ReactToastify.css';
import '@/styles/toastify.css';

// const consola = localFont({
//   src: '../styles/font/Satoshi-Variable.ttf',
//   display: 'swap',
// });  ${consola.className}

export const metadata: Metadata = {
  title: 'Glimpse',
  description: 'Glimpse',
};

export default function RootLayout({
  children,
  imageModal,
}: Readonly<{
  children: React.ReactNode;
  imageModal: React.ReactNode;
}>) {
  // 추후 lang en으로 변경

  return (
    <html lang="ko">
      {/* <Notification accessToken={accessToken?.value} /> */}
      <body className="relative mx-auto max-w-sm font-custom">
        <Gradient />
        <ReactQueryProviders>
          <div className="min-h-screen bg-background">
            {children}
            {imageModal}
            <ToastContainer
              autoClose={5000}
              position="bottom-center"
              theme="colored"
              closeButton={false}
              hideProgressBar
              limit={3}
            />
          </div>
        </ReactQueryProviders>
      </body>
      {process.env.NEXT_PUBLIC_GTM_ID && (
        <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID} />
      )}
      {process.env.NEXT_PUBLIC_GA_ID && (
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
      )}
    </html>
  );
}
