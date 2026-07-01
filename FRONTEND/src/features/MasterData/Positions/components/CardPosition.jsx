export function CardPosition({ position }) {
  return (
    <div
      className="
        bg-white
        rounded-xl md:rounded-2xl
        border border-zinc-200
        p-4 md:p-6
        flex flex-col
        items-center justify-center
        gap-2 md:gap-3
        shadow-sm
        transition-all duration-300
        hover:shadow-lg
        hover:border-zinc-900
        hover:-translate-y-1
        cursor-pointer
      "
    >
      <div
        className="
          w-12 h-12
          sm:w-14 sm:h-14
          md:w-16 md:h-16
          lg:w-20 lg:h-20
          rounded-full
          bg-zinc-900
          text-white
          flex items-center justify-center
          text-lg
          sm:text-xl
          md:text-2xl
          lg:text-3xl
          font-bold
        "
      >
        {position}
      </div>

      <span
        className="
          text-[10px]
          sm:text-xs
          md:text-sm
          text-zinc-500
          font-medium
          text-center
        "
      >
        Roller Position
      </span>
    </div>
  );
}
