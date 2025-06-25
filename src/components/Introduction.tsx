import desk from "@/assets/arrangement-with-empty-notepad-desk.webp";

export default function Introduction() {
  return (
    <section
      className={`flex h-full w-full bg-cover bg-center bg-no-repeat`}
      style={{ backgroundImage: `url(${desk})` }}
    >
      <div className="flex h-full w-full flex-col items-center justify-center bg-white/80">
        <h2 className="mb-2 text-4xl">민경현</h2>
        <hr className="mb-5 h-[3px] w-20 bg-orange-500 text-orange-500" />
        <p className="text-gray-8 text-2xl leading-9">
          기술에 <span className="font-bold text-gray-800">사람에 대한 이해</span>를 더해
          <br />
          <span className="font-bold text-gray-800">공동의 목표</span>를 향해 나아가는 <br />
          <span className="font-bold text-gray-800">프론트엔드</span> 개발자{" "}
          <span className="font-bold text-gray-800">민경현</span>입니다.
        </p>
      </div>
    </section>
  );
}
