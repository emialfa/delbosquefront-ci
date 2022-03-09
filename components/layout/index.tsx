import LinesBar from "../linesbar";
import Footer from "../footer";
import Navbar from "../navbar";
import Search from "../search";
import { ICategory } from "../../types/categories";
import { IType } from "../../types/types";

interface Props {
    children: React.ReactNode;
    categories: {
        lines: ICategory[],
        types: IType[]
    };
}

const Layout: React.FC<Props> = ({children, categories, }) => {
  return <>
        <Navbar categories={categories} />
        <main>
        {categories && <Search />}
        {categories && <LinesBar categories={categories} />}
        {children}
        </main>
        <Footer />
  </>;
};

export default Layout;
