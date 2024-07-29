import { Alert, Button, Divider, Grid, Snackbar, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import homeStyle from './home.module.css'
import { getUserDetails } from '../../../services/auth'
import ProductForm from '../../client/components/productForm'
import { getAllCategories } from '../../../services/category'//, getBestProducts



function Home()
{
  const [roles, setUserRole] = useState([{}])
  const [categoryList, setCategoryList] = useState([]) //Aquí tengo mi variable y mi función.
  //const [bestProductList, setBestProductList] = useState([])
  const [product, setProduct] = useState({ name: "", description: "", subCategory: "", image: "" })
  const [refresh, setRefresh] = useState(false) //este componente es para el formulario de creacion de productos.
  const [openModal, setOpenModal] = useState(false)
  const [showProductFeedback, setProductFeedback] = React.useState({ show: false, status: false, infoText: '' })

  useEffect(() => {
    getUserDetails({ setUserRole })
    getAllCategories({ setCategoryList })
    //getBestProducts({ setBestProductList })
  }, [refresh])

  
  const handleOpenModal = () => setOpenModal(true) //esto es lo que habre el formulario. para ingresar un producto.

  const closeProductFeedback = (event, reason) => {

    if (reason === 'clickaway') {
      return;
    }
    setProductFeedback({ show: false });
  };

  return(
    <div className='container'> {/*className={homeStyle.container} */}

          <div className={homeStyle.title_container}>

              <div>
                {roles.length > 1 ? <Button variant="text" color='success'
                  id="button" onClick={handleOpenModal}>
                  Añadir nuevo producto
                </Button> : null}
              </div>

              <Typography variant="span" fontSize={35} component="h2" ml={1} fontWeight={600}>
                Athom Lab
              </Typography>

              <Typography variant="p" fontSize={20} component="h2" ml={1} fontWeight={400}>
                A Tu Servicio
              </Typography>

          </div>

          <Divider></Divider>

          <div className={homeStyle.title_container}>
            <Typography variant="span" fontSize={30} component="h2" ml={1} fontWeight={600}>
              Todos los productos
            </Typography>
          </div>

          <Grid className={homeStyle.cajaC}>
          {categoryList.map(categoryItem => (

            <Grid className={homeStyle.caja} key={categoryItem.id}>
              <div className={homeStyle.header}>
              <h4 className={homeStyle.neon}>{categoryItem.name}</h4>
              <h4 className={homeStyle.neon}>{categoryItem.name}</h4>
              </div>
              <div className={homeStyle.cuerpo}>
                <a href={'https://frontathomlab-production.up.railway.app/store/subcategory/' + categoryItem.name}>{/*http://localhost:3000/, https://frontathomlab-production.up.railway.app/*/}
                  <img src={categoryItem.image} alt=""/>
                </a>
              </div>
            </Grid>

          ))}
        </Grid>

          <br></br>

          <Snackbar open={showProductFeedback.show} autoHideDuration={2000} onClose={closeProductFeedback}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }} >
            <Alert onClose={closeProductFeedback} severity={showProductFeedback.status ? "success" : "error"} sx={{ width: '100%' }}>
              {showProductFeedback.infoText}
            </Alert>
          </Snackbar>
          
          
          <ProductForm setRefresh={setRefresh} openModal={openModal} setOpenModal={setOpenModal}
            setProductFeedback={setProductFeedback} edit={false}
            setProduct={setProduct} product={product}/>

    </div>
  )
}

export default Home

/*
color='primary' onClick={() => {
                addProduct(productItem, 1)
              }} 
<Snackbar open={showProductFeedback.show} autoHideDuration={2000} onClose={closeProductFeedback}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }} >
        {showProductFeedback.show && <Alert onClose={closeProductFeedback} severity={showProductFeedback.status ? "success" : "error"} sx={{ width: '100%' }}>
          {showProductFeedback.infoText}
        </Alert>}
      </Snackbar>
---------------------------
esta la sque despues de la linea 65
<Grid container spacing={3} className={homeStyle.grid} mb={2}>
        {bestProductList.map(productItem =>

          <Grid item xs={12} md={3} style={{ position: 'relative' }} key={productItem.id}>
              <IconButton color='primary' onClick={() => {
                addProduct(productItem, 1)
              }} 
              className={homeStyle.add_button}>
              <AddShoppingCartIcon />
              </IconButton>
              <ProductCard product={productItem} />
          </Grid>)
        }
</Grid>
*/