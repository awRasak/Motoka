import { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import blogData from "../Data/blogs";
import { computeSlug, findPostBySlug } from "../utils/computeSlug";
import Seo from "../components/Seo";
import { blogPostingSchema, breadcrumbSchema } from "../utils/schema";
import { STATES } from "../Data/states";

// Blog content is plain text with the odd HTML fragment; a raw slice(0, 160)
// used to end mid-word and leak markup into meta descriptions.
function cleanDescription(content, max = 160) {
  const text = String(content || "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const stop = Math.max(cut.lastIndexOf(". "), cut.lastIndexOf("! "), cut.lastIndexOf("? "));
  return stop > max * 0.6 ? cut.slice(0, stop + 1) : `${cut.trimEnd()}…`;
}

export default function BlogPage() {
  const { slug } = useParams();

  // Case-insensitive so the mixed-case URLs indexed before slugs were
  // lowercased still resolve instead of 404ing.
  const blog = findPostBySlug(blogData, slug);
  const prevBlog = blogData[blogData.indexOf(blog) - 1];
  const nextBlog = blogData[blogData.indexOf(blog) + 1];

  // Canonical is built from the title, never from the slug in the URL. A
  // visitor arriving on an old mixed-case link would otherwise self-canonicalise
  // to that old URL, leaving both variants indexed and competing. Pointing at
  // the computed slug consolidates them onto one.
  const canonicalPath = blog ? `/blog/${computeSlug(blog.title)}` : `/blog/${slug}`;
  const description = cleanDescription(blog?.content);
  const parsedDate = blog ? new Date(blog.date) : null;
  const publishedTime =
    parsedDate && !Number.isNaN(parsedDate.getTime())
      ? parsedDate.toISOString()
      : undefined;

  const jsonLd = useMemo(
    () =>
      blog
        ? [
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Blog", path: "/blogs" },
              { name: blog.title, path: canonicalPath },
            ]),
            blogPostingSchema({
              title: blog.title,
              description,
              path: canonicalPath,
              date: blog.date,
              image: blog.image,
            }),
          ]
        : undefined,
    [blog, canonicalPath, description],
  );

  if (!blog) {
    return <div className="p-10">Blog not found</div>;
  }

  return (
    <section className="py-16">
      <div className="max-w-3xl mx-auto px-4">
        <Seo
          title={blog.title}
          description={description}
          path={canonicalPath}
          image={blog.image}
          imageAlt={blog.title}
          type="article"
          publishedTime={publishedTime}
          modifiedTime={publishedTime}
          jsonLd={jsonLd}
        />
        {/* Visible breadcrumbs mirror the BreadcrumbList schema and give
            crawlers another internal-link path into the hub and states. */}
        <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap gap-2 text-xs text-gray-500">
          <Link to="/" className="hover:text-[#2389E3]">Home</Link>
          <span aria-hidden="true">/</span>
          <Link to="/blogs" className="hover:text-[#2389E3]">Blog</Link>
          <span aria-hidden="true">/</span>
          <span className="text-gray-700">{blog.title}</span>
        </nav>
        {/* Image */}
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-64 object-cover rounded-2xl mb-6"
        />

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {blog.title}
        </h1>

        {/* Date */}
        <p className="text-gray-400 mb-6 text-lg">{blog.date}</p>

        {/* Content */}
        <div className="text-gray-700 leading-relaxed whitespace-pre-line text-sm mb-12">
          {blog.content}
        </div>

        {/* Internal link into the renewal hub. Every post funnels topical
            authority to the money pages with keyword-rich anchor text, which
            is how the hub outranks thin competitor pages. Destination is
            chosen by what the post is actually about. */}
        <div className="mb-12 rounded-2xl border border-[#2389E3]/20 bg-[#2389E3]/5 p-6">
          <p className="mb-2 text-sm font-semibold text-[#05243F]">
            Ready to sort it out?
          </p>
          <p className="mb-4 text-sm text-gray-600">
            Motoka renews vehicle licences, roadworthiness and driver’s licences
            online through a licensed agent network — no office queue.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/renew/vehicle-license"
              className="rounded-lg bg-[#2389E3] px-4 py-2 text-sm font-semibold text-white hover:brightness-110"
            >
              Renew your vehicle licence online
            </Link>
            <Link
              to="/renew/drivers-license"
              className="rounded-lg border border-[#2389E3] px-4 py-2 text-sm font-semibold text-[#2389E3] hover:bg-[#2389E3]/10"
            >
              Renew your driver’s licence
            </Link>
          </div>
        </div>

        {/* Further reading — outbound resources, verified URLs only */}
        {blog.resources?.length > 0 && (
          <div className="mb-12 rounded-2xl border border-gray-100 bg-gray-50 p-6">
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">
              Further reading
            </h2>
            <ul className="space-y-2">
              {blog.resources.map((resource) => (
                <li key={resource.url}>
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[#2389E3] hover:underline"
                  >
                    {resource.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
        {/* Every post links to the state pages. They are otherwise only
            reachable from the footer, so this spreads internal link equity to
            the local-intent pages. */}
        <div className="mb-12 rounded-2xl border border-gray-100 bg-gray-50 p-6">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">
            Vehicle licence rules by state
          </h2>
          <div className="flex flex-wrap gap-2">
            {STATES.map((state) => (
              <Link
                key={state.slug}
                to={`/states/${state.slug}`}
                className="rounded-full border border-[#2389E3]/30 px-3 py-1.5 text-xs font-medium text-[#2389E3] hover:bg-[#2389E3]/10"
              >
                {state.name} vehicle licence renewal
              </Link>
            ))}
          </div>
        </div>

        <div className="flex justify-between gap-4 border-t pt-6">

          {/* Previous */}
          {prevBlog ? (
            <Link to={`/blog/${computeSlug(prevBlog.title)}`} className="group">
              <p className="text-sm text-gray-400">← Previous</p>
              <p className="font-medium group-hover:text-[#2389E3] text-sm">
                {prevBlog.title}
              </p>
            </Link>
          ) : <div />}

          {/* Next */}
          {nextBlog ? (
            <Link to={`/blog/${computeSlug(nextBlog.title)}`} className="text-right group">
              <p className="text-sm text-gray-400">Next →</p>
              <p className="font-medium group-hover:text-[#2389E3] text-sm">
                {nextBlog.title}
              </p>
            </Link>
          ) : <div />}
        </div>
      </div>
    </section>
  );
}