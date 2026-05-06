import Link from '@/components/Link'
import Tag from '@/components/Tag'
import home from '@/data/site/home.json'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'
import NewsletterForm from 'pliny/ui/NewsletterForm'

const MAX_DISPLAY = 5

export default function Home({ posts }) {
  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <section className="pt-8 pb-10 md:pt-12">
          <div className="relative overflow-hidden rounded-lg border border-slate-800 bg-slate-950 px-6 py-10 shadow-2xl shadow-slate-200/60 md:px-10 md:py-14 dark:shadow-black/20">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.32),transparent_30%),radial-gradient(circle_at_80%_15%,rgba(168,85,247,0.34),transparent_28%),linear-gradient(135deg,rgba(15,23,42,0.98),rgba(30,41,59,0.94)_48%,rgba(88,28,135,0.82))]" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.055)_1px,transparent_1px)] bg-[size:42px_42px] opacity-35" />
            <div className="relative grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
              <div className="space-y-6">
                <p className="font-mono text-sm font-semibold text-cyan-200">{home.eyebrow}</p>
                <h1 className="max-w-4xl text-4xl leading-tight font-extrabold text-white sm:text-5xl md:text-6xl">
                  {home.title}
                </h1>
                <p className="max-w-3xl text-lg leading-8 text-slate-200">{home.description}</p>
                <div className="flex flex-wrap gap-3 pt-2">
                  <Link
                    href="/blog"
                    className="rounded-md bg-cyan-300 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-white"
                  >
                    阅读最新心得
                  </Link>
                  <Link
                    href="/tags"
                    className="rounded-md border border-white/25 px-5 py-3 text-sm font-bold text-white transition hover:border-cyan-200 hover:text-cyan-100"
                  >
                    分类探索
                  </Link>
                </div>
              </div>
              <div className="relative min-h-72 overflow-hidden rounded-lg border border-white/10 bg-white/5 p-5 font-mono text-sm text-slate-200 backdrop-blur">
                <div className="absolute inset-x-8 top-10 h-40 rounded-full bg-cyan-300/20 blur-3xl" />
                <div className="relative mb-5 flex gap-2">
                  <span className="h-3 w-3 rounded-full bg-cyan-300" />
                  <span className="h-3 w-3 rounded-full bg-violet-300" />
                  <span className="h-3 w-3 rounded-full bg-slate-200" />
                </div>
                <div className="relative space-y-4">
                  <div>
                    <p className="text-slate-400">{home.stackLabel}</p>
                    <p>{home.stackValue}</p>
                  </div>
                  <div>
                    <p className="text-slate-400">{home.hostLabel}</p>
                    <p>{home.hostValue}</p>
                  </div>
                  <div>
                    <p className="text-slate-400">{home.modeLabel}</p>
                    <p>{home.modeValue}</p>
                  </div>
                  <div className="pt-4 text-cyan-200">
                    <p>{'>'} co-create --with ai</p>
                    <p className="mt-2 text-slate-300">status: exploring new possibilities</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="space-y-2 pt-8 pb-4 md:space-y-5">
          <h2 className="text-2xl leading-8 font-bold text-gray-900 sm:text-3xl dark:text-gray-100">
            Latest writing
          </h2>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            {siteMetadata.description}
          </p>
        </div>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {!posts.length && 'No posts found.'}
          {posts.slice(0, MAX_DISPLAY).map((post) => {
            const { slug, date, title, summary, tags } = post
            return (
              <li key={slug} className="py-12">
                <article>
                  <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                    <dl>
                      <dt className="sr-only">Published on</dt>
                      <dd className="text-base leading-6 font-medium text-gray-500 dark:text-gray-400">
                        <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
                      </dd>
                    </dl>
                    <div className="space-y-5 xl:col-span-3">
                      <div className="space-y-6">
                        <div>
                          <h2 className="text-2xl leading-8 font-bold tracking-tight">
                            <Link
                              href={`/blog/${slug}`}
                              className="text-gray-900 dark:text-gray-100"
                            >
                              {title}
                            </Link>
                          </h2>
                          <div className="flex flex-wrap">
                            {tags.map((tag) => (
                              <Tag key={tag} text={tag} />
                            ))}
                          </div>
                        </div>
                        <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                          {summary}
                        </div>
                      </div>
                      <div className="text-base leading-6 font-medium">
                        <Link
                          href={`/blog/${slug}`}
                          className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                          aria-label={`Read more: "${title}"`}
                        >
                          Read more &rarr;
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            )
          })}
        </ul>
      </div>
      {posts.length > MAX_DISPLAY && (
        <div className="flex justify-end text-base leading-6 font-medium">
          <Link
            href="/blog"
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label="All posts"
          >
            All Posts &rarr;
          </Link>
        </div>
      )}
      {siteMetadata.newsletter?.provider && (
        <div className="flex items-center justify-center pt-4">
          <NewsletterForm />
        </div>
      )}
    </>
  )
}
