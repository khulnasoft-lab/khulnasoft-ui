import { featureFlagsConfig } from '../../../config';
import GlBadge from './badge.vue';
import GlBadgeNew from './badge_new.vue';

export default featureFlagsConfig.USE_NEW_GL_BADGE === 'true' ? GlBadgeNew : GlBadge;
