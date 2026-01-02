import { Header } from "../components/header/header";
import { PostContent } from "../components/PostContent";
import { CommentList } from "../components/CommentList";
import { AddComment } from "../components/AddComment";

export default function Post() {
  return (
    <>
      <Header />
      <PostContent />
      <CommentList />
      <AddComment />
    </>
  )
}
