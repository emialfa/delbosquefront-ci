import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import Head from "next/head";
import styled from "styled-components";
import Navbar from "../components/navbar";
import { getAllCategories } from "../services/categories";
import { getAllTypes } from "../services/types";
import { ICategory } from "../types/categories";
import { IType } from "../types/types";

const Container = styled.section`
    color: black;
    margin: 2rem 8%;
    background-color: white;
    padding: 2rem 3rem 3.5rem 3rem;
    font-weight: 300;
    border-radius: 30px;
`
const Title = styled.p`
    margin: 1rem 0px 0rem 0px;
`
const Text = styled.p`
    font-weight: 300;
`
const PrivacyPolicies: NextPage = ({categories}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
     <Head>
        <title>Políticas de privacidad de los usuarios | Del Bosque Bordados - Tienda</title>
        <meta name='description' content="Políticas de privacidad de los usuarios" />
        <meta property="og:image" itemProp="image" content='https://res.cloudinary.com/delbosque-tienda/image/upload/c_scale,h_299/v1639889237/dbblogo_pyw94n.png' />
    </Head>
    <Navbar categories={categories} />
    <Container>
      <Title style={{textAlign: 'center', marginBottom: '1.5rem'}}>
        <strong style={{fontSize: '18px'}}>POLÍTICA DE PRIVACIDAD DE LOS USUARIOS</strong>
      </Title>
      <br/>
      <Text>
        La presente Política de Privacidad establece los términos en que
        delbosquebordados.com.ar usa y protege la información que es
        proporcionada por sus usuarios al momento de utilizar su sitio web. Esta
        compañía está comprometida con la seguridad de los datos de sus
        usuarios. Cuando le pedimos llenar los campos de información personal
        con la cual usted pueda ser identificado, lo hacemos asegurando que sólo
        se empleará de acuerdo con los términos de este documento. Sin embargo
        esta Política de Privacidad puede cambiar con el tiempo o ser
        actualizada por lo que le recomendamos y enfatizamos revisar
        continuamente esta página para asegurarse que está de acuerdo con dichos
        cambios.
      </Text>
      <br/>
      <Title>
        <strong>Información que es recogida</strong>
      </Title>
      <br/>
      <Text>
        Nuestro sitio web podrá recoger información personal por ejemplo:
        Nombre,&nbsp; información de contacto como&nbsp; su dirección de correo
        electrónica e información demográfica. Así mismo cuando sea necesario
        podrá ser requerida información específica para procesar algún pedido o
        realizar una entrega o facturación.
      </Text>
      <br/>
      <Title>
        <strong>Uso de la información recogida</strong>
      </Title>
      <br/>
      <Text>
        Nuestro sitio web emplea la información con el fin de proporcionar el
        mejor servicio posible, particularmente para mantener un registro de
        usuarios, de pedidos en caso que aplique, y mejorar nuestros productos y
        servicios. &nbsp;Es posible que sean enviados correos electrónicos
        periódicamente a través de nuestro sitio con ofertas especiales, nuevos
        productos y otra información publicitaria que consideremos relevante
        para usted o que pueda brindarle algún beneficio, estos correos
        electrónicos serán enviados a la dirección que usted proporcione y
        podrán ser cancelados en cualquier momento.
      </Text>
      <Text>
        Delbosquebordados.com.ar está altamente comprometido en cumplir con el
        compromiso de mantener su información segura. Usamos los sistemas más
        avanzados y los actualizamos constantemente para asegurarnos que no
        exista ningún acceso no autorizado.
      </Text>
      <br/>
      <Title>
        <strong>Cookies</strong>
      </Title>
      <br/>
      <Text>
        Una cookie se refiere a un fichero que es enviado con la finalidad de
        solicitar permiso para almacenarse en su ordenador, al aceptar dicho
        fichero se crea y la cookie sirve entonces para tener información
        respecto al tráfico web, y también facilita las futuras visitas a una
        web recurrente. Otra función que tienen las cookies es que con ellas las
        web pueden reconocerte individualmente y por tanto brindarte el mejor
        servicio personalizado de su web.
      </Text>
      <Text>
        Nuestro sitio web emplea las cookies para poder identificar las páginas
        que son visitadas y su frecuencia. Esta información es empleada
        únicamente para análisis estadístico y después la información se elimina
        de forma permanente. Usted puede eliminar las cookies en cualquier
        momento desde su ordenador. Sin embargo las cookies ayudan a
        proporcionar un mejor servicio de los sitios web, estás no dan acceso a
        información de su ordenador ni de usted, a menos de que usted así lo
        quiera y la proporcione directamente
        <a href="" target="_blank"></a>. Usted puede aceptar o negar el uso de
        cookies, sin embargo la mayoría de navegadores aceptan cookies
        automáticamente pues sirve para tener un mejor servicio web. También
        usted puede cambiar la configuración de su ordenador para declinar las
        cookies. Si se declinan es posible que no pueda utilizar algunos de
        nuestros servicios.
      </Text>
      <br/>
      <Title>
        <strong>Enlaces a Terceros</strong>
      </Title>
      <br/>
      <Text>
        Este sitio web pudiera contener en laces a otros sitios que pudieran ser
        de su interés. Una vez que usted de clic en estos enlaces y abandone
        nuestra página, ya no tenemos control sobre al sitio al que es
        redirigido y por lo tanto no somos responsables de los términos o
        privacidad ni de la protección de sus datos en esos otros sitios
        terceros. Dichos sitios están sujetos a sus propias políticas de
        privacidad por lo cual es recomendable que los consulte para confirmar
        que usted está de acuerdo con estas.
      </Text>
      <br/>
      <Title>
        <strong>Control de su información personal</strong>
      </Title>
      <br/>
      <Text>
        En cualquier momento usted puede restringir la recopilación o el uso de
        la información personal que es proporcionada a nuestro sitio web.&nbsp;
        Cada vez que se le solicite rellenar un formulario, como el de alta de
        usuario, puede marcar o desmarcar la opción de recibir información por
        correo electrónico. &nbsp;En caso de que haya marcado la opción de
        recibir nuestro boletín o publicidad usted puede cancelarla en cualquier
        momento.
      </Text>
      <Text>
        Esta compañía no venderá, cederá ni distribuirá la información personal
        que es recopilada sin su consentimiento, salvo que sea requerido por un
        juez con un orden judicial.
      </Text>
      <Text>
        delbosquebordados.com.ar Se reserva el derecho de cambiar los términos
        de la presente Política de Privacidad en cualquier momento.
      </Text>
    </Container>
    </>
  );
};

export default PrivacyPolicies;

export const getStaticProps: GetStaticProps = async () => {
    const lines: ICategory[] = await getAllCategories()
    const types: IType[] = await getAllTypes()
    return {props: { categories: {lines, types}}}
  }