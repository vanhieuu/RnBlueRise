export const ButtonSize = {};
export const LAYOUT = {
    BOTTOM_NAVIGATION: {
        HEIGHT: 56,
        VERTICAL_PADDING: 8,
        get TOTAL_HEIGHT() {
            return this.HEIGHT + (this.VERTICAL_PADDING * 2);
        }
    },
    HEADER: {
        HEIGHT: 66,
    },
    SPACING: {
        xxs: 2,
        xs: 4,
        tiny: 6,
        sm: 8,
        md: 12,
        base: 16,
        lg: 20,
        xl: 22,
        xxl: 24
    },
    BORDER_RADIUS: {
        SMALL: 8,
        MEDIUM: 12,
        LARGE: 16,
        XLARGE: 24,
    },
    CONTENT_BACKGROUND: {
        DEFAULT: '#f6f7fc'
    }
} ;