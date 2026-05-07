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
        <section className="pt-3 pb-6 md:pt-5 md:pb-8">
          <div className="relative overflow-hidden rounded-lg border border-slate-200 bg-slate-50 px-5 py-7 shadow-sm md:px-8 md:py-9 dark:border-slate-800 dark:bg-slate-950">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_16%,rgba(34,211,238,0.22),transparent_32%),radial-gradient(circle_at_82%_12%,rgba(124,58,237,0.2),transparent_30%),linear-gradient(135deg,rgba(248,250,252,0.98),rgba(239,246,255,0.92)_48%,rgba(245,243,255,0.9))] dark:bg-[radial-gradient(circle_at_18%_16%,rgba(56,189,248,0.22),transparent_32%),radial-gradient(circle_at_82%_12%,rgba(124,58,237,0.24),transparent_30%),linear-gradient(135deg,rgba(15,23,42,0.98),rgba(30,41,59,0.96)_50%,rgba(46,16,101,0.78))]" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.045)_1px,transparent_1px)] bg-[size:40px_40px] opacity-60 dark:bg-[linear-gradient(rgba(255,255,255,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.055)_1px,transparent_1px)] dark:opacity-35" />
            <div className="relative grid gap-7 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
              <div className="space-y-4">
                <p className="font-mono text-xs font-semibold tracking-wide text-cyan-700 uppercase dark:text-cyan-200">
                  {home.eyebrow}
                </p>
                <h1 className="max-w-3xl text-3xl leading-tight font-extrabold text-slate-950 sm:text-4xl md:text-5xl dark:text-white">
                  {home.title}
                </h1>
                <p className="max-w-3xl text-base leading-7 text-slate-700 md:text-lg dark:text-slate-200">
                  {home.description}
                </p>
                <div className="flex flex-wrap gap-3 pt-1">
                  <Link
                    href="/blog"
                    className="rounded-md bg-slate-950 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-cyan-700 dark:bg-cyan-300 dark:text-slate-950 dark:hover:bg-white"
                  >
                    阅读最新心得
                  </Link>
                  <Link
                    href="/tags"
                    className="rounded-md border border-slate-300 bg-white/40 px-4 py-2.5 text-sm font-bold text-slate-800 transition hover:border-cyan-500 hover:text-cyan-700 dark:border-white/20 dark:bg-white/5 dark:text-white dark:hover:border-cyan-200 dark:hover:text-cyan-100"
                  >
                    分类探索
                  </Link>
                </div>
              </div>
              <div className="relative hidden overflow-hidden rounded-lg border border-slate-200/80 bg-white/65 p-5 font-mono text-sm text-slate-700 shadow-sm backdrop-blur lg:block dark:border-white/10 dark:bg-white/5 dark:text-slate-200">
                <div className="absolute inset-x-8 top-8 h-32 rounded-full bg-cyan-300/20 blur-3xl" />
                <div className="relative mb-4 flex gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-cyan-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-violet-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-slate-400" />
                </div>
                <div className="relative space-y-3">
                  <div>
                    <p className="text-slate-500 dark:text-slate-400">{home.stackLabel}</p>
                    <p>{home.stackValue}</p>
                  </div>
                  <div>
                    <p className="text-slate-500 dark:text-slate-400">{home.hostLabel}</p>
                    <p>{home.hostValue}</p>
                  </div>
                  <div>
                    <p className="text-slate-500 dark:text-slate-400">{home.modeLabel}</p>
                    <p>{home.modeValue}</p>
                  </div>
                  <div className="pt-2 text-cyan-700 dark:text-cyan-200">
                    <p>{'>'} co-create --with ai</p>
                    <p className="mt-1 text-slate-500 dark:text-slate-300">
                      status: exploring new possibilities
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="space-y-2 pt-6 pb-3 md:space-y-3">
          <h2 className="text-2xl leading-8 font-bold text-gray-900 sm:text-3xl dark:text-gray-100">
            最新文章
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
