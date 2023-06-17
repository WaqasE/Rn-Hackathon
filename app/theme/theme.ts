import { extendTheme } from 'native-base'
import colors from './colors'
import opacity from './opacity'
import shadows from './shadow'
const theme = extendTheme({
    colors: colors,
    opacity: opacity,
    shadows: shadows,
})
export default theme;