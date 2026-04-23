import { Component } from '@angular/core';

import { NavigationComponent } from '@common/components/navigation/navigation';
import { LandingHeroComponent } from './hero/hero';
import { LandingFeaturedComponent } from './featured/featured';
import { LandingTestimonialsComponent } from './testimonials/testimonials';
import { LandingAboutComponent } from './about/about';
import { LandingFooterComponent } from './footer/footer';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    NavigationComponent,
    LandingHeroComponent,
    LandingFeaturedComponent,
    LandingTestimonialsComponent,
    LandingAboutComponent,
    LandingFooterComponent,
  ],
  templateUrl: './landing.html',
  styleUrl: './landing.scss',
})
export class Landing {}
