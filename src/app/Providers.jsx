import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from '@store/store'
import { AlertProvider } from '@context/AlertProvider'
import { ThemeProvider } from '@mui/material/styles';
import theme from '@styles/CustomTheme'


export default function Providers({ children }) {
    return (
    <>
            <ThemeProvider theme={theme}>
                <AlertProvider>
                    <Provider store={store}>
                        <BrowserRouter>
                            {children}
                        </BrowserRouter>
                    </Provider>
                </AlertProvider>
            </ThemeProvider>
    </>
    )
}