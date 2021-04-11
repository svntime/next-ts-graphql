import { FC } from 'react';

interface IProps {
  id: string;
  title: string;
}

const Post: FC<IProps> = ({ id, title }) => {
  return (
    <li className="shadow-lg p-4">
      <div className="grid sm:block lg:grid xl:block grid-cols-2 grid-rows-2 text-center">
        <p className="font-medium text-black mb-2">{id}</p>
        <p>{title}</p>
      </div>
    </li>
  );
};

export default Post;
