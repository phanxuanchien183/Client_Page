import { ResponsiveImage, Loading } from 'components'

export default function BigLoading() {
  return (
    <div className="p-8 mx-auto space-y-10 text-center rounded-lg bg-red-100/90 max-w-max ">
      <ResponsiveImage
        dimensions="w-40 h-12 mx-auto"
        className="overflow-hidden"
        src="/logo-htshalom.png"
        alt={`HT Shalom`}
      />
      <Loading />
    </div>
  );
}
