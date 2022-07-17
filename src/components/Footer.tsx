import style from '../styles/Footer.module.scss'

const Footer = () => {
  return (
    <div>
      <footer className={style.footer}>
        <p>
          Crafted with ❤ by
          <a
            className={style.footer_text}
            href="https://github.com/bhagyashreeWalanj"
            target="_blank"
          >
            Bhagyashree Walanj
          </a>
          .
        </p>
        <p>
          <a
            className={style.footer_text}
            href="https://github.com/bhagyashreeWalanj"
            target="_blank"
          >
            Source code
          </a>
          available on GitHub.
        </p>
      </footer>
    </div>
  )
}

export default Footer
