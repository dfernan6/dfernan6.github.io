import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    res.status(200).send(`
        <html>
          <head>
            <style>
              html {
                color: #8a8a8a;
                background-color: #dbdbdb;
                font-size: 5rem;
              }
            </style>
          </head>
          <body>
            <b>Hora certa:</b>
            ${new Date().toLocaleTimeString('pt-BR')}
            <a href="/">Voltar</a>
          </body>
        </html>
    `)
}