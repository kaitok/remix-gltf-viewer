const Back = ({ href, label }: { href: string; label: string }) => {
  return (
    <a href={href} className="inline-flex items-center hover:opacity-40">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="w-5 h-5 mr-0.5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 19.5 8.25 12l7.5-7.5"
        />
      </svg>
      <span className="text-sm">{label}</span>
    </a>
  )
}

export default Back
