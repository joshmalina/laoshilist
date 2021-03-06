'use strict';

/**
 * @ngdoc service
 * @name laoshiListApp.languageLevel
 * @description
 * # languageLevel
 * Constant in the laoshiListApp.
 */
angular.module('laoshiListApp')
  .constant('languageLevel', [
  		{
  			level: 0,
  			shortDesc: 'Poor',
  			desc: 'cannot speak or read'
  		},
  		{
  			level: 1,
  			shortDesc: 'Very Basic',
  			desc: 'very basic speaking and reading. very limited vocabulary'
  		},
  		{
  			level: 2,
  			shortDesc: 'Basic',
  			desc: 'limited proficiency. can satisfy routine demands in speaking and reading'
  		},
  		{
  			level: 3,
  			shortDesc: 'Competent',
  			desc: 'passable language skills. sufficient vocabulary, knowledge of grammar and speaking ability for basic understanding in the majority of situations'
  		},
  		{
  			level: 4,
  			shortDesc: 'High',
  			desc: 'accurate use of the language for all educational or professional needs'
  		},
  		{
  			level: 5,
  			shortDesc: 'Fluent',
  			desc: 'bilingual. equivalent to that of an educated native speaker'
  		}
  	]);
