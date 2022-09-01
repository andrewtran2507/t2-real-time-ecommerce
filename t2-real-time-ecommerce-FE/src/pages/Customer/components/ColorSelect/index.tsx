import "./styles.css"
const ColorSelect = ({data, onChange, checked}: any) => {
  const randomName = "color" + Math.random().toString();
  return (
    <div className="d-flex">
      {data.map((item: any) => (
        <div key={`ColorSelect-${item.id}`}>
          <input type="radio" id={item.id + randomName} name="color" checked={checked === item.id} value={item.code} onChange={() => {onChange(item.id)}}/>
          <label htmlFor={item.id + randomName}>
            <span style={{backgroundColor: item.code}}>
              <img
                src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/242518/check-icn.svg"
                alt="Checked Icon"
              />
            </span>
          </label>
        </div>
      ))}
    </div>
  )
}
export default ColorSelect
