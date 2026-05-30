export function TopBar() {
  return (
    <>
      <div className="max-w-full  ">
        <div className="flex gap-3 justify-center p-3">
          <button className="px-3 py-1 border border-gray-400 rounded-md">
            Home
          </button>
          <button className="px-3 py-1 border border-gray-400 rounded-md">
            Rollers
          </button>
          <button className="px-3 py-1 border border-gray-400 rounded-md">
            Position
          </button>
        </div>
      </div>
    </>
  );
}
