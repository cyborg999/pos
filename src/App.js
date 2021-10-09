import React from "react"

class App extends React.Component {
  constructor(props){
    super(props)

    this.state = { 
      searchTxt : ''
      , stocked : false
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }
  regroupData(data){
    let regrouped = []

    data.forEach((d,x) => {
      if(!regrouped[d.category]){
        regrouped[d.category] = []
      }
      regrouped[d.category].push(d)
    })

    return regrouped
  }

  loadList(data){
    data = this.regroupData(data)
    let outOfStock = { 'color' : 'red'}
    let inStock = { 'color' : 'green', 'fontWeight': 'bold'}

    return Object.values(data).map((x,y)=>{
     return x.map((dd,z) => {
       if(this.state.searchTxt != ''){
        if(dd.name.includes(this.state.searchTxt)){
          if(this.state.stocked && !dd.stocked){
            return 
          }
         return <tr key={ z}>
            <td>{dd.category}</td>
            <td style={ dd.stocked ? inStock :  outOfStock}>{dd.name}</td>
            <td>{dd.price}</td>
          </tr>
        } else {
         return
        }
       } else {
        return <tr key={ z}>
          <td>{dd.category}</td>
          <td style={ dd.stocked ? inStock :  outOfStock}>{dd.name}</td>
          <td>{dd.price}</td>
        </tr>
       }
      })
     
    })
  }

  handleChange(e, data){
    let searchStr = e.target.value

    this.setState({
      searchTxt : searchStr
    })

    this.loadList(this.getInitialData())
  }

  handleClick(){
    this.setState({stocked : !this.state.stocked })
  }

  getInitialData(){
    return  [
      {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
      {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
      {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
      {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
      {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
      {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
    ] 
  }

  render(){
    return (
      <form>
        <label>search <input type="text" placeholder="Search here" onChange={ this.handleChange } value={ this.state.searchTxt } /></label>
        <br/>
        <label>only show in stock item  <input type="checkbox" onClick={ this.handleClick } checked = { this.state.stocked }  /></label>
        <table>
          <thead>
            <tr>
              <th>Category</th>
              <th>Name</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            { this.loadList(this.getInitialData()) }
          </tbody>
        </table>
      </form>
    )
  }
}

export default App