import Head from 'next/head';
import { Footer } from '../../components/commons/Footer';
import { Menu } from '../../components/commons/Menu';
import { Box, Text, Link, Image, theme } from '../../theme/components';
import { cmsService } from '../../infra/cms/cmsService';
import { pageHOC } from '../../components/wrappers/pageHOC';
import { CMSSectionRender } from '../../infra/cms/CMSSectionRender';

export async function getStaticProps({preview}) {
  const {data: cmsContent} = await cmsService({
    query: `
      query{
        pageFaq{
          pageContent{
            section{
              componentName:__typename
              ... on CommonSeoBlockRecord{
                id
                title
              }
              ... on CommonMenuRecord{
                id
              }
              ... on CommonFooterRecord{
                id
                visible
              }
              ... on PagefaqDisplayquestionSectionRecord{
                id
                title
                description
                categories{
                  id
                  title
                  questions{
                    id
                    title
                  }
                }
              }
            }
          }
        }
      }
    `,
    preview
  })

  return {
    props: {
      cmsContent
    }
  }
}

function FAQAllQuestionsScreen ({}){
  return(
    <CMSSectionRender pageName="pageFaq"/>
  )
}

/*
function FAQAllQuestionsScreen({ categories }) {
  return (
    <>
      <Head>
        <title>FAQ - Alura</title>
      </Head>

      <Menu />

      <Box
        tag="main"
        styleSheet={{
          flex: 1,
          backgroundColor: theme.colors.neutral.x050,
          paddingTop: theme.space.x20,
          paddingHorizontal: theme.space.x4,
        }}
      >
        <Box
          styleSheet={{
            display: 'flex',
            gap: theme.space.x4,
            flexDirection: {
              xs: 'column',
              md: 'row',
            },
            width: '100%',
            maxWidth: theme.space.xcontainer_lg,
            marginHorizontal: 'auto',
          }}
        >
          <Box
            styleSheet={{
              flex: 2,
              color: theme.colors.neutral.x900,
            }}
          >
            <Text tag="h1" variant="heading3">
              FAQ: Perguntas e <br />
              Dúvidas Frequentes
            </Text>
            <Text
              styleSheet={{
                color: theme.colors.neutral.x500,
              }}
            >
              Confira aqui respostas para as principais dúvidas de nossos alunos
            </Text>

            <Image
              src="https://www.alura.com.br/assets/img/home/homeNova/ilustra-alura-escafandro.1647533643.svg"
              styleSheet={{
                maxWidth: '200px',
                marginVertical: theme.space.x10,
                marginHorizontal: 'auto',
                display: {
                  xs: 'none',
                  md: 'block'
                }
              }}
            />
          </Box>

          <Box
            styleSheet={{
              flex: 3,
            }}
          >
            {categories.map(({ id, name, questions }) => {
              return (
                <Box key={id} tag="article">
                  <h1>{name}</h1>
                  <Box tag="ul">
                    {questions.map((question) => (
                      <Box key={question.id} tag="li">
                        <Box tag="article">
                          <Link href={`/faq/${question.id}`}>
                            <Text>{question.name}</Text>
                          </Link>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                </Box>
              )
            })}
          </Box>
        </Box>
      </Box>

      <Footer />
    </>
  )
}
*/

export default pageHOC(FAQAllQuestionsScreen);
