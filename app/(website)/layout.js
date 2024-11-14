import Navbar from "@/components/website/Navbar"

export default function RootLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  )
}