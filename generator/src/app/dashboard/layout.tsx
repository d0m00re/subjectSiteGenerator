type Props = {
  children: React.ReactNode;
};


const DashBoardLayout = async (props: Props) => {
  return (
    <div className="grid-cols-4 border-r shadow  p-2">
      {props.children}
    </div>
  );
};

export default DashBoardLayout;