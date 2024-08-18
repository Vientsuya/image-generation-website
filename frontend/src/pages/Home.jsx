import Nav from "../constants/components/nav"
import ImgSection from "../constants/components/home/img-section"
import InputSection from "../constants/components/home/input-section"

export default function Home() {
  return (
    <main className="min-h-screen bg-[#1A3341] text-white">
      <Nav />
      <section className="max-w-7xl mx-auto p-10">
        <ImgSection />
        <InputSection />
      </section>
    </main>
  )
}