import styled from "styled-components";
import Link from "next/link";
import { useRouter } from "next/router";
import { ICategory } from "../../types/categories";
import { IType } from "../../types/types";

const Container = styled.section`
  display: flex;
  margin: 3rem auto;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;

  &::-webkit-scrollbar {
    display: none;
  }
  @media (max-width: 540px) {
    justify-content: flex-start;
    overflow-x: scroll;
    flex-wrap: nowrap;
    scrollbar-width: none;
  }

  @media (hover: none) {
    overflow-x: scroll;
    flex-wrap: nowrap;
    scrollbar-width: none;
  }
`;

const Category = styled.div<{$background: number, $color: number}>`
  display: flex;
  margin: 10px;
  padding: 10px;
  border-radius: 10px;
  font-size: 13.9px;
  line-height: 17px;
  background: ${(props) => (props.$background ? "#99877D" : "white")};
  color: ${(props) => (props.$color ? "white" : "black")};
  white-space: nowrap;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

interface Props {
    categories: {
        lines: ICategory[];
        types: IType[];
    }
}
const LinesBar:React.FC<Props> = (props) => {
  const router = useRouter();
  const { name } = router.query;

  return (
    <>
      <Container key="linesBar">
        <Link
          key="todosLink"
          href={`/category/all`}
        >
          <a className="hover">
            <Category
              key={`Todos`}
              $background={name === undefined || name === "all" || ((name+"").search("category") === -1 && router.pathname.search("products") != -1) ? 1 : 0}
              $color={name === undefined || name === "all" || ((name+"").search("category") === -1 && router.pathname.search("products") != -1) ? 1 : 0}
            >
              Todos
            </Category>
          </a>
        </Link>
        {props.categories.lines?.map((c, key) => (
          <Link
            key={`link${key}`}
            href={`/category/${c.name}`}
          >
            <a className="hover">
              <Category
                data-test-id='category'
                $background={name && `${name}`?.search(c.name) != -1 ? 1 : 0}
                $color={name && `${name}`?.search(c.name) != -1 ? 1 : 0}
                key={`cat${key}`}
              >
                {c.name}
              </Category>
            </a>
          </Link>
        ))}
      </Container>
    </>
  );
};

export default LinesBar;
