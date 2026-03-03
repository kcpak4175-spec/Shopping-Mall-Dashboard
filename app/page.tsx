import { redirect } from "next/navigation";

export default function Home() {
    // 홈 화면(/) 접속 시 기본 대시보드인 상품 목록 페이지로 리다이렉트합니다.
    redirect("/products");
}
