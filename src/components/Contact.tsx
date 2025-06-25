import github from "@/assets/github.webp";

export default function Contact() {
  return (
    <section className="flex flex-col justify-center items-center contact-section w-full h-[calc(100%-40px)] bg-yellow-100">
      <div className="max-w-100 text-start">
        <h2>Contact</h2>
        <div className="contact-info">
          <div className="contact-item">
            <span className="icon">📧</span>
            <span className="">skyblue848@naver.com</span>
          </div>
          <div className="contact-item flex flex-row gap-2 whitespace-nowrap">
            <a href="https://github.com/Owhen-Min" className="w-full">
              <img src={github} alt="github-icon" className="w-[22px] h-5 inline" />
              <span>GitHub</span>
            </a>
          </div>
          <div className="contact-item">
            <span className="icon">📱</span>
            <span>+82 10-4389-0001</span>
          </div>
          <div className="contact-item">
            <span className="icon">📍</span>
            <span>Seoul, South Korea</span>
          </div>
        </div>
      </div>
    </section>
  );
}
