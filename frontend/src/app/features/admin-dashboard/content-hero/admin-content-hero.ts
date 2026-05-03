import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';

import { AnalyticsData } from '@common/services/managers/analytics/analytics';

@Component({
  selector: 'app-admin-content-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-content-hero.html',
  styleUrl: './admin-content-hero.scss',
})
export class AdminContentHeroComponent {
  @Input() activeSectionLabel = '';
  @Input() activeSectionDescription = '';
  @Input() analytics$!: Observable<AnalyticsData>;
}
