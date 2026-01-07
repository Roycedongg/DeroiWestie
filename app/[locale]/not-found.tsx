export default function Page({ params }: { params: { locale: string } }) {
  if (params.locale !== "zh" && params.locale !== "en") {
    // 可以直接返回 404
  }

}
