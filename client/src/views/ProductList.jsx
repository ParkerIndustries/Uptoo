import React, { Component } from 'react'
import api from '../Api'
import { Layout, Table, Typography, Button } from 'antd'
import { SyncOutlined, DeleteOutlined } from '@ant-design/icons';
  
const { Text, Title } = Typography
const { Content } = Layout

class UpdateProduct extends Component {
    updateData = event => {
        event.preventDefault()
        window.location.href = `/products/update/${this.props.id}`
    }

    render() {
        return <Button placement="topLeft" title="Modifier" type="primary link" onClick={this.updateData}><SyncOutlined/></Button>
    }
}

class DeleteProduct extends Component {
    deleteData = event => {
        event.preventDefault()
        if (
            window.confirm(
                `Voulez-vous supprimer le produit ${this.props.id}?`,
            )
        ) {
            api.deleteProductById(this.props.id)
            window.location.reload()
        }
    }

    render() {
        return <Button placement="topLeft" title="Supprimer" type="danger link" onClick={this.deleteData}><DeleteOutlined /></Button>
    }
}

class ProductList extends Component  {

    constructor(props) {
        super(props)
        this.state = {
            products: [],
            columns: [],
            isLoading: false,
        }
    }

    componentDidMount = async () => {
        this.setState({ isLoading: true })
        await api.getAllProducts().then(products => {
            this.setState({
                products: products.data.data,
                isLoading: false,
            })
        })
    }

    render() {
        const { products, isLoading } = this.state
        
        const columns = [
            {
                title: 'Nom du produit',
                dataIndex: 'title',
                filterable: true,
            },
            {
                title: 'Description',
                dataIndex: 'description',
                filterable: true,
            },
            {
                title: 'Key',
                dataIndex: 'data',
                key: 'data.key',
                render: data => (data.map(dt => {return (<Text>{dt.key}</Text>)})),
            },
            {
                title: 'Value',
                dataIndex: 'data',
                key: 'data.value',
                render: data => (data.map(dt => {return (<Text>{dt.value}</Text>)})),
            },
            {
                title: 'Modifier',
                dataIndex: '',
                key: '',
                align: 'center',
                render: data => {return (<span><UpdateProduct id={data._id} /></span>)},
            },
            {
                title: 'Supprimer',
                dataIndex: '',
                key: '',
                align: 'center',
                render: data => {return (<span><DeleteProduct id={data._id} /></span>)},
            },
        ]

        return (
            <Content style={{ marginTop: 50, padding: 50, boxShadow: "10px 20px 30px rgba(90, 90, 90, 0.2)", borderRadius: 4 }}>
                <Title>Liste des produits </Title>
                <Table columns={columns} dataSource={products} bordered/>
            </Content>
        )
    }
}

export default ProductList
