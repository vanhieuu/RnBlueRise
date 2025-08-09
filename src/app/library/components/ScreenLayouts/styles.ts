import { createThemedStyles } from "@utils";

export const baseScreenLayoutStyles = createThemedStyles({
    container: {
        flex: 1,
    },
    backgroundImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
    },
    fullScreenBackground: {
        flex: 1,
    },
    backgroundImageStyle: {
        width: '100%',
        height: '100%',
    },
    roundedBackground: {
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
    },
    headerContainer: {
        position: 'relative',    
        zIndex: 1,
    },
    content: {
        flex: 1,
    },
    roundedContent: {    
        backgroundColor: '#fff',
        overflow: 'hidden',
    },
}); 