import { IAccountItem } from './AccountItem.model';

const AccountItem = (props: IAccountItem) => {
  const { name, isSelected, onChange } = props;
  return (
    <>
      <div className="col-12">
        <div
          className={`card p-3 h-4rem align-items-center w-ful flex justify-content-between mb-0 border-1 border-round-xl cursor-pointer ${
            isSelected ? ' border-primary' : ' border-gray-500'
          }`}
          onClick={() => {
            onChange();
          }}
        >
          <label
            htmlFor="cb1"
            className="p-checkbox-label ml-2 capitalize-first"
          >
            {name}
          </label>
          <i className="pi-angle-right pi text-gray-600 font-light text-lg" />
        </div>
      </div>
      <br></br>
    </>
  );
};

export default AccountItem;
