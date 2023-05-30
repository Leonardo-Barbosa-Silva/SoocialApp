import { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    useTheme,
    useMediaQuery,
    Button,
    TextField
} from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, registerUser } from '../features/users/slice';
import Dropzone from 'react-dropzone';
import FlexBetween from './FlexBetween';


const registerSchema = yup.object().shape({
    firstName: yup.string().min(2, 'First name too short').required("required"),
    lastName: yup.string().min(2, 'First name too short').required("required"),
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required"),
    location: yup.string().required("required"),
    occupation: yup.string().required("required"),
    picture: yup.string().required("required")
})

const loginSchema = yup.object().shape({
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required")
})

const initialValuesRegister = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    location: "",
    occupation: "",
    picture: ""   
}

const initialValuesLogin = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    location: "",
    occupation: "",
    picture: ""   
}


function Form() {
    const [ pageType, setPageType ] = useState('login')

    const isRegistered = useSelector( state => state.users.isRegistered)
    const isLogged = useSelector( state => state.users.isLogged)

    const { palette } = useTheme()

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const isNonMobileScreen = useMediaQuery("(min-width: 600px)")

    
    const handleFormSubmit = async (values, onSubmitProps) => {
        pageType === "login" ? (
            await login(values, onSubmitProps)
        ) : (
            await register(values, onSubmitProps)
        )
    }

    const register = async (values, onSubmitProps) => {
        const formData = new FormData()
        for (let value in values) {
            formData.append(value, values[value])
        }
        formData.append("picturePath", values.picture.name)

        dispatch(registerUser(formData))

        onSubmitProps.resetForm()
    }

    const login = async (values, onSubmitProps) => {
        dispatch(loginUser(values))

        onSubmitProps.resetForm()
    }

    useEffect( () => {
        if (isRegistered) {
            setPageType("login")
        } else if (isLogged) {
            navigate("/home")
        }
    }, [ isLogged, isRegistered, navigate ])

    return (
        <Formik
            onSubmit={handleFormSubmit}
            initialValues={pageType === "login" ? initialValuesLogin : initialValuesRegister}
            validationSchema={pageType === "login" ? loginSchema : registerSchema}
        >
            {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
                setFieldValue,
                resetForm
            }) => (
                <form onSubmit={handleSubmit}>
                    <Box
                        display="grid"
                        gap="15px"
                        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                        sx={{
                            "& > div": {
                                gridColumn: isNonMobileScreen ? undefined : "span 4"
                            }
                        }}
                    >
                        {pageType === "register" && (
                            <>
                                <TextField
                                    label="First Name"
                                    size="small"
                                    name="firstName"
                                    value={values.firstName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={Boolean(touched.firstName) && Boolean(errors.firstName)}
                                    helperText={touched.firstName && errors.firstName}
                                    sx={{
                                        gridColumn: "span 2"
                                    }}
                                />
                                <TextField
                                    label="Last Name"
                                    size="small"
                                    name="lastName" 
                                    value={values.lastName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                                    helperText={touched.lastName && errors.lastName}
                                    sx={{
                                        gridColumn: "span 2"
                                    }}
                                />
                                <TextField
                                    label="E-mail"
                                    size="small"
                                    type="email"
                                    name="email"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={Boolean(touched.email) && Boolean(errors.email)}
                                    helperText={touched.email && errors.email}
                                    sx={{
                                        gridColumn: "span 4"
                                    }}
                                />
                                <TextField
                                    label="Password"
                                    size="small"
                                    type="password"
                                    name="password" 
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={Boolean(touched.password) && Boolean(errors.password)}
                                    helperText={touched.password && errors.password}
                                    sx={{
                                        gridColumn: "span 4"
                                    }}
                                />
                                <Box
                                    gridColumn="span 4"
                                    border={`1px solid ${palette.neutral.medium}`}
                                    borderRadius="5px"
                                    p="1rem"
                                >
                                    <Dropzone
                                        acceptedFiles=".jpg,.jpeg,.png"
                                        multiple={false}
                                        onDrop={ (acceptedFiles) => {
                                            setFieldValue("picture", acceptedFiles[0])
                                        } }
                                    >
                                        { ({ getRootProps, getInputProps }) => (
                                            <Box
                                                {...getRootProps()}
                                                border={`2px dashed ${palette.primary.main}`}
                                                p="1rem"
                                                sx={{
                                                    "&:hover": { cursor: "pointer" }
                                                }}
                                            >
                                                <input {...getInputProps()}/>
                                                {!values.picture ? (
                                                    <p>Add your picture here.</p>
                                                ) : (
                                                    <FlexBetween>
                                                        <Typography>
                                                            {values.picture.name}
                                                        </Typography>
                                                        <EditOutlinedIcon />
                                                    </FlexBetween>
                                                )}
                                            </Box>
                                        ) }
                                    </Dropzone>
                                </Box>
                                <TextField
                                    label="Location"
                                    size="small"
                                    name="location"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={Boolean(touched.location) && Boolean(errors.location)}
                                    helperText={touched.location && errors.location}
                                    sx={{
                                        gridColumn: "span 4"
                                    }}
                                />
                                <TextField
                                    label="Occupation"
                                    size="small"
                                    name="occupation"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={Boolean(touched.occupation) && Boolean(errors.occupation)}
                                    helperText={touched.occupation && errors.occupation}
                                    sx={{
                                        gridColumn: "span 4"
                                    }}
                                />
                            </>
                        )}

                        {pageType === "login" && (
                            <>
                                <TextField
                                    label="E-mail"
                                    size="small"
                                    type="email"
                                    name="email"
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={Boolean(touched.email) && Boolean(errors.email)}
                                    helperText={touched.email && errors.email}
                                    sx={{
                                        gridColumn: "span 4"
                                    }}
                                />
                                <TextField
                                    label="Password"
                                    size="small"
                                    type="password"
                                    name="password" 
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={Boolean(touched.password) && Boolean(errors.password)}
                                    helperText={touched.password && errors.password}
                                    sx={{
                                        gridColumn: "span 4"
                                    }}
                                />
                            </>
                        )}
                    </Box>

                    <Box>
                        <Button
                            fullWidth
                            type="submit"
                            sx={{
                                m: "1.25rem 0",
                                p: "1rem",
                                backgroundColor: palette.primary.main,
                                color: palette.background.alt,
                                "&:hover": { color: palette.primary.main }
                            }}
                            onSubmit={handleSubmit}
                        >
                            {pageType === "login" ? "LOGIN" : "REGISTER"}
                        </Button>
                        <Typography
                            onClick={ () => {
                                setPageType(pageType === "login" ? "register" : "login")
                            }}
                            sx={{
                                textDecoration: "underline",
                                color: palette.primary.main,
                                "&:hover": {
                                    cursor: "pointer",
                                    color: palette.primary.light
                                }
                            }}
                        >
                            {pageType === "login" ? (
                                "Don't have an account? Sign Up here."
                            ) : (
                                "Already have an account? Login here."
                            ) }
                        </Typography>
                    </Box>
                </form>
            )}
        </Formik>
    )
}


export default Form;