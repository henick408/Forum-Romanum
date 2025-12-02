export default function SideMenu() {
  return (
    <div className=" flex min-w-3/12 my-2 rounded items-center min-h-[calc(100vh-8rem)] bg-blue-300  opacity-80   gap-6 p-6 flex-col text-zinc-600">
      <div
        style={{ fontFamily: "EB Garamond, serif" }}
        className="text-3xl bg-zinc-100 shadow p-3 rounded-2xl text-zinc-700"
      >
        Dodaj wpis +
      </div>
      <div className="flex flex-col items-start w-full p-3 bg-blue-50 rounded">
        <div
          style={{ fontFamily: "EB Garamond, serif" }}
          className=" text-2xl l text-zinc-700"
        >
          Kategorie
        </div>
        <div className="w-full h-px bg-blue-200 my-2"></div>
        <div
          style={{ fontFamily: "EB Garamond, serif" }}
          className="flex flex-col gap-1 pl-2 pt-2 text-lg"
        >
          <div>Psy </div>
          <div>Koty </div>
          <div> Self-care</div>
          <div> Biznes</div>
          <div>Studia </div>
          <div>Ptaszarstwo</div>
          <div> Katolicyzm</div>
          <div>Jedzenie</div>
          <div>Myszy </div>
        </div>
      </div>
    </div>
  );
}
