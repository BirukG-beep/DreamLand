"use client";

import { motion } from "framer-motion";

const posts = [
  {
    title: "Top 10 Travel Tips for Comfortable Stay in DreamLand Hotel, Bishoftu, Ethiopia",
    desc: "How to make your lodge experience more relaxing and stress-free.",
    img: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Why Location Matters When Choosing a Lodge in Bishoftu, Ethiopia",
    desc: "Discover how location impacts your travel experience.",
    img: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1200&auto=format&fit=crop",
  },
];

export default function BlogSection() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600&family=DM+Sans:wght@300;400;500&display=swap');

        .blog-section {
          background: #ffffff;
          padding: 5rem 1.5rem 6rem;
          font-family: 'DM Sans', sans-serif;
          color: #1a1814;
        }

        .blog-inner {
          max-width: 1200px;
          margin: 0 auto;
        }

        .blog-header {
          text-align: center;
          margin-bottom: 4rem;
        }

        .blog-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.4rem, 5vw, 3.6rem);
          font-weight: 300;
        }

        .blog-subtitle {
          color: #7a7066;
          margin-top: 1rem;
        }

        .blog-post {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
          align-items: center;
          margin-bottom: 5rem;
        }

        @media (min-width: 768px) {
          .blog-post {
            grid-template-columns: 1fr 1fr;
          }
        }

        .blog-post.reverse {
          direction: rtl;
        }

        .blog-post.reverse * {
          direction: ltr;
        }

        .blog-image {
          border-radius: 24px;
          overflow: hidden;
          border: 1px solid rgba(180,140,80,0.18);
        }

        .blog-image img {
          width: 100%;
          height: 360px;
          object-fit: cover;
          transition: 0.5s ease;
        }

        .blog-image:hover img {
          transform: scale(1.05);
        }

        .blog-content {
          padding: 1rem;
        }

        .blog-post-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.8rem;
          margin-bottom: 1rem;
          color: #1a1814;
        }

        .blog-desc {
          color: #7a7066;
          line-height: 1.8;
        }

        .blog-btn {
          margin-top: 1.5rem;
          display: inline-block;
          color: #a8895f;
          font-weight: 500;
          cursor: pointer;
          transition: 0.3s ease;
        }

        .blog-btn:hover {
          color: #b1813f;
        }
      `}</style>

      <section className="blog-section" id="blog">
        <div className="blog-inner">

          {/* HEADER */}
          <div className="blog-header">
            <h2 className="blog-title">
              Latest <span style={{ color: "#a8895f" }}>Blog</span>
            </h2>
            <p className="blog-subtitle">
              Travel tips, guides, and DreamLand Hotel updates.
            </p>
          </div>

          {/* POSTS */}
          {posts.map((post, i) => (
            <motion.div
              key={i}
              className={`blog-post ${i % 2 === 1 ? "reverse" : ""}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
            >

              {/* IMAGE */}
              <div className="blog-image">
                <img src={post.img} alt={post.title} />
              </div>

              {/* CONTENT */}
              <div className="blog-content">
                <h3 className="blog-post-title">{post.title}</h3>
                <p className="blog-desc">{post.desc}</p>

                <span className="blog-btn">Read More →</span>
              </div>

            </motion.div>
          ))}

        </div>
      </section>
    </>
  );
}