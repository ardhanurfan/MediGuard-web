function DistributedCard({
  title,
  value,
  unit,
}: {
  title: string;
  value: number;
  unit: string;
}) {
  return (
    <div className="w-full xl:w-1/2 bg-white rounded-xl p-6 flex flex-col justify-center items-center">
      <div className="flex justify-between w-full">
        <h3 className="text-[16px] font-medium text-kBlue-400">{title}</h3>
        <div className="py-1 px-2 rounded-full flex justify-center items-center gap-2 bg-kGreen-100">
          <div className="w-4 h-4 bg-kGreen-300 rounded-full"></div>
          <p className="text-xs">Live</p>
        </div>
      </div>
      <h1 className="text-[96px] font-bold text-kYellow">{value.toString()}</h1>
      {unit === "MediGuard" ? (
        <h2 className="text-kBlue-400 text-lg">
          Medi<span className="font-bold">Guard</span>
        </h2>
      ) : (
        <h2 className="text-kBlue-400 text-lg font-bold">{unit}</h2>
      )}
    </div>
  );
}

export default DistributedCard;
