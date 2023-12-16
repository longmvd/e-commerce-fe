pipeline {
    agent any

    stages {
        stage('Clone'){
          steps {
            git branch: 'main', url: 'https://github.com/longmvd/e-commerce-fe.git'
          }
        }

        stage('Build') {
            steps {
                echo 'Building..'
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
            }
        }
    }
}