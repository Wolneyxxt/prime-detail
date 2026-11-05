# Prime Detail Studio — Landing page demonstrativa

Projeto **demonstrativo fictício** da [RotaCode](https://www.instagram.com/rotacode.gg/) para apresentar a qualidade do trabalho a empresas de estética automotiva em Goiânia — GO. A Prime Detail Studio é uma empresa fictícia: não há endereço, telefone, horário, avaliações ou números reais.

## Fotografias

As fotografias foram fornecidas pelo responsável pelo projeto e estão em `assets/images/` (JPEG otimizado). **Origem e licença de cada foto ainda precisam ser confirmadas e registradas** na tabela de créditos abaixo antes de publicar.

| Arquivo | Conteúdo | Onde aparece |
| --- | --- | --- |
| `esportivo-vermelho.jpg` | Esportivo vermelho com gotas de água | Hero e galeria |
| `lavagem-capo-preto.jpg` | Capô de sedã preto com espuma | Serviço "Polimento Técnico" e galeria (detalhe) |
| `lanterna-azul.jpg` | Traseira de esportivo azul | Serviço "Vitrificação Automotiva" e galeria |
| `interior-couro.jpg` | Interior de couro e volante | Serviço "Higienização Interna" e galeria |
| `lavagem-espuma-bay.jpg` | Carro com espuma em box de lavagem | Serviço "Lavagem Detalhada" |
| `interior-limpeza-pincel.jpg` | Profissional limpando o painel com pincel | Seção Sobre |
| `roda-espuma.jpg` | Roda cromada com espuma | Galeria |
| `lavagem-carro-branco.jpg` | Carro branco durante a lavagem | Galeria |
| `og-image.jpg` | Recorte do hero (1200×630) | Prévia em redes sociais |

### Pontos de atenção

- **Resolução:** as fotos têm entre 687 e 1332 px de largura. Em telas grandes o hero fica levemente suave. Para o melhor resultado, substitua por originais com 2000 px ou mais de largura (mantendo os nomes de arquivo).
- **Fotos sem correspondência exata:** não há foto de polimento (politriz) nem de aplicação de vitrificação. Os cards desses serviços usam fotos de pintura e acabamento. O ideal é trocar por fotos desses processos.
- **Logos e placa:** algumas fotos mostram logotipos de montadoras e uma placa parcialmente visível. Para um cliente real, prefira fotos sem esses elementos.
- Algumas fotos aparecem em mais de um lugar (com recortes diferentes). Mais fotos permitem eliminar a repetição.

As fotos são ilustrativas e **não representam trabalhos reais** da empresa fictícia; o site já exibe esse aviso.

### Créditos das fotografias (preencher)

| Arquivo | Autor | Fonte (link) | Licença |
| --- | --- | --- | --- |
| esportivo-vermelho.jpg | | | |
| lavagem-capo-preto.jpg | | | |
| lanterna-azul.jpg | | | |
| interior-couro.jpg | | | |
| lavagem-espuma-bay.jpg | | | |
| interior-limpeza-pincel.jpg | | | |
| roda-espuma.jpg | | | |
| lavagem-carro-branco.jpg | | | |

Para trocar uma foto, substitua o arquivo mantendo o nome (ou altere o `src` no `index.html`). O enquadramento de cada foto é ajustado pelo `object-position` inline na tag `<img>`.

## Tecnologias

HTML5, CSS3 e JavaScript puro, sem frameworks nem build. Única dependência externa: fonte Outfit (Google Fonts), com alternativas definidas.

## Estrutura

```text
prime-detail/
├── index.html
├── css/style.css
├── js/script.js
├── assets/images/      # coloque as fotografias aqui
├── favicon.svg
└── README.md
```

## Abrir localmente

Abra `index.html` no navegador, ou rode `python3 -m http.server 8000` na pasta e acesse http://localhost:8000.

## Publicar no GitHub Pages

1. Envie o conteúdo de `prime-detail/` para um repositório (com `index.html` na raiz).
2. **Settings → Pages → Deploy from a branch**, branch `main`, pasta `/ (root)`.
3. Acesse `https://SEU-USUARIO.github.io/NOME-DO-REPOSITORIO/`.

Todos os caminhos são relativos. No Netlify, basta arrastar a pasta.

## WhatsApp e Instagram

Tudo em `SITE_CONFIG`, no início de `js/script.js`:

```js
const SITE_CONFIG = {
  companyName: "Prime Detail Studio",
  whatsappNumber: "",   // DDI + DDD + número, só dígitos
  instagramUrl: "",     // URL completa com https://
  whatsappMessage: "Olá! Conheci o site..."
};
```

Com o número vazio ou inválido, os botões mostram um aviso de contato demonstrativo e não abrem nenhum número. O link do rodapé para `@rotacode.gg` é fixo no HTML.

## Personalizar

- **Cores:** variáveis em `:root`, no início de `css/style.css`.
- **Textos:** direto no `index.html`.
- **Open Graph:** troque `og:url` e `og:image` (hoje com `SEU-USUARIO`) pelas URLs do site publicado.

## Dados ainda demonstrativos

Empresa, localização, textos institucionais, WhatsApp e Instagram (não configurados) e todas as fotografias (ilustrativas, com origem a confirmar). Não há formulário, preços, depoimentos, certificações ou dados estruturados comerciais.
