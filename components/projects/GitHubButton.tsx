import Link from "next/link";
import { FaGithub } from "react-icons/fa";

interface GitHubButtonProps {
  repoUrl?: string;
}

export default function GitHubButton({ repoUrl }: GitHubButtonProps) {
  if (!repoUrl) return null;
  return (
    <Link
      href={repoUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="btn-primary inline-flex items-center gap-2"
    >
      <FaGithub /> View on GitHub
    </Link>
  );
}
