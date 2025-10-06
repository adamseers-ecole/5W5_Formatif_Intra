import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, Validators, ReactiveFormsModule, FormGroup, ValidatorFn } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: true,
    imports: [MatToolbarModule, MatIconModule, MatCardModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule]
})
export class AppComponent {
  title = 'reactive.form';
  formGroup: FormGroup;
  constructor(private formBuilder: FormBuilder){
    this.formGroup = this.formBuilder.group(
      {
        nom: ['', [Validators.required]],
        rue: ['', [Validators.required, Validators.min(1000), Validators.max(9999)]],
        codePostal: ['', [Validators.pattern('^[A-Z][0-9][A-Z][ ]?[0-9][A-Z][0-9]$')]],
        commentaire: ['', [Validators.required, est10mots()]],
        formulaire: ['', [Validators.required, estPasNom()]],
      },
    );
  }
}

export function est10mots(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const courriel = control.value;
    // On regarde si le champ est rempli avant de faire la validation
    if (!courriel) {
      // On attend que le champ soit rempli avant de le valider
      return null;
    }
    // On fait notre validation. Includes retourne un booléen.
    const estValide = courriel.split(" ").length < 10;
    // On retourne null si c'est valide, ou un objet décrivant l'erreur sinon
    return estValide ? null : { est10mots: true };
  };
}

export function estPasNom(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const courriel = control.value;
    const nom = control.get('nom');
    // On regarde si le champ est rempli avant de faire la validation
    if (!courriel || !nom) {
      // On attend que le champ soit rempli avant de le valider
      return null;
    }
    // On fait notre validation. Includes retourne un booléen.
    const estValide = courriel.value.includes(nom.value);

    // On retourne null si c'est valide, ou un objet décrivant l'erreur sinon
    return estValide ? null : { estPasNom: true };
  };
}