import Head from 'next/head';
import { Menu } from '../../components/commons/Menu';
import { Footer } from '../../components/commons/Footer';
import { theme, Box, Button, Text, Image } from '../../theme/components';
import { pageHOC } from '../../components/wrappers/pageHOC';
import { cmsService } from '../../infra/cms/cmsService';
import { CMSSectionRender } from '../../infra/cms/CMSSectionRender';

export async function getStaticProps({ preview }) {
  const { data: cmsContent } = await cmsService({
    query: `
      query{
        pageHome{
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
              ... on PagehomeHerosectionRecord{
                id
                title
                description
                ctalink
                ctatext
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
    },
    revalidate: 60
  }
}

function HomeScreen(){
  return(
    <CMSSectionRender pageName="pageHome" />
  )
}

// function HomeScreen() {
//   return (
//     <>
//       <Head>
//         <title>Home - Alura</title>
//       </Head>

//       <Menu />

//       <Box
//         tag="main"
//         styleSheet={{
//           flex: 1,
//           paddingTop: theme.space.x20,
//           paddingHorizontal: theme.space.x4,
//           background: `linear-gradient(${theme.colors.primary.x900}, ${theme.colors.primary.x700})`,
//           color: theme.colors.neutral.x000,
//           display: 'flex',
//           alignItems: 'center',
//           flexDirection: {
//             xs: 'column',
//             md: 'row',
//           },
//           flexWrap: 'nowrap',
//           justifyContent: 'space-evenly',
//         }}
//       >
//         <Box
//           styleSheet={{
//             maxWidth: '450px'
//           }}
//         >
//           <Text tag="h1" variant="display1">
//             Mergulhe em Tecnologia!
//           </Text>
//           <Text tag="p" variant="body1">
//             Você vai estudar, praticar, discutir e se aprofundar em uma plataforma que respira tecnologia.
//           </Text>
//           <Button href="/faq" colorVariant="neutral">
//             Principais dúvidas
//           </Button>
//         </Box>

//         <Image
//           src="https://www.alura.com.br/assets/img/home/homeNova/ilustra-alura-escafandro.1647533643.svg"
//           styleSheet={{
//             maxWidth: {
//               xs: '200px',
//               sm: 'initial',
//             },
//             marginVertical: theme.space.x10,
//           }}
//         />
//       </Box>

//       <Footer />
//     </>
//   )
// }

export default pageHOC(HomeScreen);
