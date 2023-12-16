pipeline {
    agent any

    stages {
        stage('Clone') {
          steps {
            git branch: 'main', url: 'https://github.com/longmvd/e-commerce-fe.git'
          }
        }
        stage('Build') {
            steps {
                withDockerRegistry(credentialsId: 'docker-hub', url: 'https://index.docker.io/v1/') {
                    sh 'docker build -t giadienanhkysi/ecommerce-frontend .'
                    sh 'docker push giadienanhkysi/ecommerce-frontend'
                }
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
            }
        }
    }
}